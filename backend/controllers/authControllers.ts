import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

import { catchAsyncErrors } from '../middlewares/catchAsyncErrors';
import User from '../models/user';
import sendEmail from '../utils/sendEmail';
import ErrorHandler from '../utils/errorHandler';
import { upload_file, delete_file } from '../utils/cloudinary';
import { resetPasswordHTMLTemplate } from '../utils/emailTemplate';

// Register user => /api/auth/register
export const registerUser = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const { name, email, password } = body;

  const user = await User.create({
    name,
    email,
    password,
  });

  return NextResponse.json({
    success: true,
  });
});

// Update user profile => /api/me/update
export const updateProfile = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const userData = {
    name: body.name,
    email: body.email,
  };

  const user = await User.findByIdAndUpdate(req.user._id, userData);

  return NextResponse.json({
    success: true,
    user,
  });
});

// Update user password => /api/me/update_password
export const updatePassword = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const user = await User.findById(req?.user?._id).select('+password');

  const isMatched = await user.comparePassword(body.oldPassword);

  if (!isMatched) {
    throw new ErrorHandler('Old password is incorrect', 404);
  }

  user.password = body.password;

  return NextResponse.json({
    success: true,
  });
});

// Upload user avatar => /api/me/upload_avatar
export const uploadAvatar = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const avatarResponse = await upload_file(body.avatar, 'bookit/avatars');

  // Remove avatar from cloudinary
  if (req?.user?.avatar?.public_id) {
    await delete_file(req?.user?.avatar?.public_id);
  }

  const user = await User.findByIdAndUpdate(req?.user?._id, {
    avatar: avatarResponse,
  });

  return NextResponse.json({
    success: true,
    user,
  });
});

// Forgot password => /api/forgot_password
export const forgotPassword = catchAsyncErrors(async (req: NextRequest) => {
  const body = await req.json();

  const user = await User.findOne({ email: body.email });

  if (!user) {
    throw new ErrorHandler('User not found with this email', 404);
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save();

  // Create reset password url
  const resetUrl = `${process.env.API_URL}/password/reset/${resetToken}`;

  const message = resetPasswordHTMLTemplate(user?.name, resetUrl);

  try {
    await sendEmail({
      email: user?.email,
      subject: 'BookIT Password Recovery',
      message,
    });
  } catch (error: any) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    throw new ErrorHandler(error?.message, 500);
  }

  return NextResponse.json({
    success: true,
    user,
  });
});

// Reset password => /api/reset/:token
export const resetPassword = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { token: string } }) => {
    const body = await req.json();

    // Hash token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(params.token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPassworExpire: { $gt: Date.now() },
    });

    if (!user) {
      throw new ErrorHandler(
        'Password reset token is invalid or has been expired',
        404
      );
    }

    if (body.password !== body.confirmPassword) {
      throw new ErrorHandler('Passwords does no match', 400);
    }

    // Set the new Password
    user.password = body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return NextResponse.json({
      success: true,
    });
  }
);

// Get all users => /api/admin/users
export const allAdminUsers = catchAsyncErrors(async (req: NextRequest) => {
  const users = await User.find();

  return NextResponse.json({
    success: true,
    users,
  });
});

// Get user details => /api/admin/users/:id
export const getUserDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const user = await User.findById(params?.id);

    if (!user) {
      throw new ErrorHandler('User not founded', 404);
    }

    return NextResponse.json({
      success: true,
      user,
    });
  }
);

// Update user details => /api/admin/users/:id
export const updateUserDetails = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const body = await req.json();

    const newUserData = {
      name: body.name,
      email: body.email,
      role: body.role,
    };

    const user = await User.findByIdAndUpdate(params.id, newUserData);

    return NextResponse.json({
      success: true,
      user,
    });
  }
);

// Delete user => /api/admin/users/:id
export const deleteUser = catchAsyncErrors(
  async (req: NextRequest, { params }: { params: { id: string } }) => {
    const user = await User.findById(params.id);

    if (!user) {
      throw new ErrorHandler('User not founded', 404);
    }

    // Remove avatar from cloudinary
    if (user?.avatar?.public_id) {
      await delete_file(user?.avatar?.public_id);
    }

    await user.deleteOne();

    return NextResponse.json({
      success: true,
    });
  }
);
