import { TResetPassword, TCreateAccount } from "../types/emailTemplate";

const createAccount = (values: TCreateAccount) => {
  const data = {
    to: values.email,
    subject: "Verify your account",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style type="text/css">
    /* Base styles */
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }
    
    /* Theme colors - These will be replaced dynamically */
    :root {
      --primary-color: #3498db; /* Default blue theme */
      --secondary-color: #2980b9;
      --accent-color: #e7f4fd;
      --text-color: #333333;
      --button-text: #ffffff;
    }
    
    /* Red theme */
    .theme-red {
      --primary-color: #e74c3c;
      --secondary-color: #c0392b;
      --accent-color: #fdeeee;
    }
    
    /* Green theme */
    .theme-green {
      --primary-color: #2ecc71;
      --secondary-color: #27ae60;
      --accent-color: #eafaf1;
    }
    
    /* Purple theme */
    .theme-purple {
      --primary-color: #9b59b6;
      --secondary-color: #8e44ad;
      --accent-color: #f5eef8;
    }
    
    /* Orange theme */
    .theme-orange {
      --primary-color: #f39c12;
      --secondary-color: #d35400;
      --accent-color: #fef5e7;
    }
    
    /* Responsive styles */
    @media only screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
      }
      .content-block {
        padding: 20px 15px !important;
      }
      .button {
        width: 100% !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f6f6f6;">
  <!-- Apply theme class dynamically -->
  <div class=${values.theme}>
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%; background-color: #f6f6f6;">
      <tr>
        <td align="center" valign="top">
          <!-- Email container -->
          <table class="email-container" border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; margin: 20px auto;">
            <!-- Header -->
            <tr>
              <td style="background-color: var(--primary-color, #3498db); padding: 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Your Company</h1>
              </td>
            </tr>
            
            <!-- Main content -->
            <tr>
              <td class="content-block" style="background-color: #ffffff; padding: 40px 30px; border-left: 1px solid #e6e6e6; border-right: 1px solid #e6e6e6;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td>
                      <h2 style="color: var(--primary-color, #3498db); margin-top: 0;">Hello,${values.name}!</h2>
                      <p style="color: var(--text-color, #333333); margin-bottom: 20px;">Thank you for signing up. Please verify your email address to complete your registration.</p>
                      
                      <!-- Verification button -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="center">
                            <p class="button" style="background-color: var(--primary-color, #3498db); border: solid 1px var(--secondary-color, #2980b9); border-radius: 4px; color: var(--button-text, #ffffff); cursor: pointer; display: inline-block; font-size: 16px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize;">${values.otp}</p>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="color: var(--text-color, #333333); margin-top: 30px;">If you didn't create an account, you can safely ignore this email.</p>
    
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="background-color: var(--accent-color, #e7f4fd); padding: 20px; text-align: center; border-left: 1px solid #e6e6e6; border-right: 1px solid #e6e6e6; border-bottom: 1px solid #e6e6e6;">
                <p style="color: var(--text-color, #333333); margin: 0; font-size: 14px;">© 2025 Your Company. All rights reserved.</p>
                <p style="color: var(--text-color, #333333); margin: 10px 0 0; font-size: 14px;">
                  <a href="{{CONTACT_LINK}}" style="color: var(--primary-color, #3498db); text-decoration: none;">Contact Us</a> | 
                  <a href="{{PRIVACY_LINK}}" style="color: var(--primary-color, #3498db); text-decoration: none;">Privacy Policy</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`,
  };
  return data;
};

const resetPassword = (values: TResetPassword) => {
  const data = {
    to: values.email,
    subject: "Reset your password",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset</title>
  <style type="text/css">
    /* Base styles */
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
      line-height: 1.6;
    }
    
    /* Theme colors - These will be replaced dynamically */
    :root {
      --primary-color: #3498db; /* Default blue theme */
      --secondary-color: #2980b9;
      --accent-color: #e7f4fd;
      --text-color: #333333;
      --button-text: #ffffff;
    }
    
    /* Red theme */
    .theme-red {
      --primary-color: #e74c3c;
      --secondary-color: #c0392b;
      --accent-color: #fdeeee;
    }
    
    /* Green theme */
    .theme-green {
      --primary-color: #2ecc71;
      --secondary-color: #27ae60;
      --accent-color: #eafaf1;
    }
    
    /* Purple theme */
    .theme-purple {
      --primary-color: #9b59b6;
      --secondary-color: #8e44ad;
      --accent-color: #f5eef8;
    }
    
    /* Orange theme */
    .theme-orange {
      --primary-color: #f39c12;
      --secondary-color: #d35400;
      --accent-color: #fef5e7;
    }
    
    /* Responsive styles */
    @media only screen and (max-width: 600px) {
      .email-container {
        width: 100% !important;
      }
      .content-block {
        padding: 20px 15px !important;
      }
      .button {
        width: 100% !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f6f6f6;">
  <!-- Apply theme class dynamically -->
  <div class="{{THEME_CLASS}}">
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width: 100%; background-color: #f6f6f6;">
      <tr>
        <td align="center" valign="top">
          <!-- Email container -->
          <table class="email-container" border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; margin: 20px auto;">
            <!-- Header -->
            <tr>
              <td style="background-color: var(--primary-color, #3498db); padding: 20px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Your Company</h1>
              </td>
            </tr>
            
            <!-- Main content -->
            <tr>
              <td class="content-block" style="background-color: #ffffff; padding: 40px 30px; border-left: 1px solid #e6e6e6; border-right: 1px solid #e6e6e6;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td>
                      <h2 style="color: var(--primary-color, #3498db); margin-top: 0;">Hello, {{NAME}}!</h2>
                      <p style="color: var(--text-color, #333333); margin-bottom: 20px;">We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
                      <p style="color: var(--text-color, #333333); margin-bottom: 30px;">To reset your password, click the button below:</p>
                      
                      <!-- Reset password button -->
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="center">
                            <a href="{{RESET_LINK}}" class="button" style="background-color: var(--primary-color, #3498db); border: solid 1px var(--secondary-color, #2980b9); border-radius: 4px; color: var(--button-text, #ffffff); cursor: pointer; display: inline-block; font-size: 16px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize;">Reset Password</a>
                          </td>
                        </tr>
                      </table>
                      
                      <p style="color: var(--text-color, #333333); margin-top: 30px;">This password reset link will expire in <strong>{{EXPIRY_TIME}}</strong>.</p>
                      <p style="color: var(--text-color, #333333);">If the button doesn't work, copy and paste this link into your browser:</p>
                      <p style="color: var(--primary-color, #3498db); word-break: break-all;">{{RESET_LINK}}</p>
                      
                      <!-- Security notice -->
                      <div style="margin-top: 30px; padding: 15px; background-color: var(--accent-color, #e7f4fd); border-left: 4px solid var(--primary-color, #3498db);">
                        <p style="color: var(--text-color, #333333); margin: 0; font-size: 14px;"><strong>Security Notice:</strong> Never share this link with anyone. Our team will never ask for your password or this reset link.</p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            
            <!-- Footer -->
            <tr>
              <td style="background-color: var(--accent-color, #e7f4fd); padding: 20px; text-align: center; border-left: 1px solid #e6e6e6; border-right: 1px solid #e6e6e6; border-bottom: 1px solid #e6e6e6;">
                <p style="color: var(--text-color, #333333); margin: 0; font-size: 14px;">© 2025 Your Company. All rights reserved.</p>
                <p style="color: var(--text-color, #333333); margin: 10px 0 0; font-size: 14px;">
                  <a href="{{CONTACT_LINK}}" style="color: var(--primary-color, #3498db); text-decoration: none;">Contact Us</a> | 
                  <a href="{{PRIVACY_LINK}}" style="color: var(--primary-color, #3498db); text-decoration: none;">Privacy Policy</a>
                </p>
                <p style="color: var(--text-color, #333333); margin: 10px 0 0; font-size: 12px;">If you didn't request a password reset, please <a href="{{REPORT_LINK}}" style="color: var(--primary-color, #3498db); text-decoration: none;">let us know</a> immediately.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>`,
  };
  return data;
};

export const emailTemplate = {
  createAccount,
  resetPassword,
};
