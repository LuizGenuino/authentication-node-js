export const VERIFICATION_EMAIL_TEMPLATE = `
<p><strong>Verify Your Email</strong></p>
<p>Hello,</p>
<p>Thank you for signing up! Your verification code is:</p>
<p><strong>{verificationCode}</strong></p>
<p>Enter this code on the verification page to complete your registration.</p>
<p>This code will expire in 24 hours for security reasons.</p>
<p>If you didn't create an account with us, please ignore this email.</p>
<p>Best regards,<br>{company}</p>
<p><em>This is an automated message, please do not reply to this email.</em></p>
`;

export const WELCOME_EMAIL_TEMPLATE = `
<p><strong>Welcome to Our Platform!</strong></p>
<p>Hello {name},</p>
<p>Thank you for joining us at <strong>{company}</strong>! We're excited to have you on board.</p>
<p>Feel free to explore the features we offer and let us know if you need any assistance.</p>
<p>If you have any questions or need support, our team is here to help.</p>
<p>Best regards,<br>{company}</p>
<p><em>This is an automated message, please do not reply to this email.</em></p>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<p><strong>Password Reset Successful</strong></p>
<p>Hello,</p>
<p>We're writing to confirm that your password has been successfully reset.</p>
<p>If you did not initiate this password reset, please contact our support team immediately.</p>
<p>For security reasons, we recommend that you:</p>
<ul>
  <li>Use a strong, unique password</li>
  <li>Enable two-factor authentication if available</li>
  <li>Avoid using the same password across multiple sites</li>
</ul>
<p>Thank you for helping us keep your account secure.</p>
<p>Best regards,<br>{company}</p>
<p><em>This is an automated message, please do not reply to this email.</em></p>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<p><strong>Password Reset</strong></p>
<p>Hello,</p>
<p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
<p>To reset your password, click the link below:</p>
<p><a href="{resetURL}"><strong>Reset Password</strong></a></p>
<p>This link will expire in 1 hour for security reasons.</p>
<p>Best regards,<br>{company}</p>
<p><em>This is an automated message, please do not reply to this email.</em></p>
`;