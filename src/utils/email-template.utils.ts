import { LogoIcon } from 'src/assets/logo';

type ActionTemplateType = 'verify' | 'resetPass';

export const generateEmailTemplate = (
  link: string,
  actionType: ActionTemplateType = 'verify',
  resetToken?: string,
) => {
  const variantsActionTypes: Record<ActionTemplateType, string> = {
    verify: 'confirm your email address',
    resetPass: 'reset your password',
  };

  const resetPassTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Password Reset</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
        body {
  background-color: #333333;
  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
  color: #ffffff;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  border-radius: 6px;
}

.instruction {
  margin-bottom: 16px;
}

.label {
  margin-bottom: 8px;
  font-weight: bold;
}

.reset-token {
  background-color: #ff6d3a;
  color: #ffffff;
  padding: 16px;
  border-radius: 4px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
}
       
        
      </style>
    </head>
   <body>
  <div class="container">
    <p class="instruction">You requested a password reset. Please use your verification code to reset your password.</p>
    <p class="label">Your verification code:</p>
    <div class="reset-token">
      ${resetToken}
    </div>
  </div>
</body>
    </html>
  `;

  return actionType === 'resetPass'
    ? resetPassTemplate
    : `
  <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Email Confirmation</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style type="text/css">
       
      @media screen {
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 400;
          src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
        }
        @font-face {
          font-family: 'Source Sans Pro';
          font-style: normal;
          font-weight: 700;
          src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
        }
      }

      body,
      table,
      td,
      a {
        -ms-text-size-adjust: 100%; /* 1 *
        -webkit-text-size-adjust: 100%; /* 2 *
      }

      table,
      td {
        mso-table-rspace: 0pt;
        mso-table-lspace: 0pt;
      }
       
      img {
        -ms-interpolation-mode: bicubic;
      }
       
      a[x-apple-data-detectors] {
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        color: inherit !important;
        text-decoration: none !important;
      }

      div[style*="margin: 16px 0;"] {
        margin: 0 !important;
      }
      body {
        width: 100% !important;
        height: 100% !important;
        padding: 0 !important;
        margin: 0 !important;
      }
      /**
       * Collapse table borders to avoid space between cells.
       *
      table {
        border-collapse: collapse !important;
      }
      a {
        color: #1a82e2;
      }
      img {
        height: auto;
        line-height: 100%;
        text-decoration: none;
        border: 0;
        outline: none;
      }
      </style>

    </head>
    <body style="background-color: #e9ecef;">

      <!-- start preheader -->
      <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
        Verify your email to use Qreates!
      </div>
      <!-- end preheader -->

      <!-- start body -->
      <table border="0" cellpadding="0" cellspacing="0" width="100%">

        <!-- start logo -->
        <tr>
          <td align="center" bgcolor="#e9ecef">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td align="center" valign="top" style="padding: 36px 24px;">
                  <a href=${process.env.FRONTEND_APP_URL} target="_blank" style="display: inline-block;">
                    <svg width="178" height="35" viewBox="0 0 178 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_4479_16386) width="178" height="35" viewBox="0 0 178 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M30.206 28.7992C32.8594 25.7856 34.4692 21.8306 34.4692 17.5002C34.4692 8.0512 26.8087 0.390625 17.3596 0.390625C7.91057 0.390625 0.25 8.0512 0.25 17.5002C0.25 26.9493 7.91057 34.6099 17.3596 34.6099C20.5802 34.6099 23.5919 33.7194 26.1649 32.1729L27.5895 33.8536H34.49L30.206 28.7992ZM17.3596 28.7491C11.3561 28.7491 6.48887 23.7344 6.48887 17.5475C6.48887 11.3606 11.3561 6.34591 17.3596 6.34591C23.3631 6.34591 28.2304 11.3606 28.2304 17.5475C28.2304 19.9807 27.477 22.2333 26.198 24.07L21.9915 19.1072H15.0909L22.2496 27.5533C20.7797 28.3181 19.1188 28.7491 17.3596 28.7491Z" fill="#1a82e2"/>
                      <path d="M72.1899 23.6448H78.6925C78.7643 23.1031 78.8021 22.5511 78.8021 21.9905C78.8021 15.211 73.5624 9.69902 66.815 9.56289C66.7299 9.561 66.6458 9.56006 66.5607 9.56006C59.6951 9.56006 54.1302 15.1249 54.1302 21.9905C54.1302 28.8561 59.6951 34.421 66.5607 34.421C66.6458 34.421 66.7309 34.4191 66.815 34.4182C66.9029 34.4201 66.9918 34.421 67.0806 34.421C72.1114 34.421 76.472 31.6674 78.6159 27.6462C78.3238 27.5753 78.0317 27.5034 77.7387 27.4325C76.0826 27.0289 74.4255 26.6243 72.7693 26.2207C71.4554 28.2719 68.9353 29.5736 66.4652 29.4119C63.4876 29.2163 60.4967 26.8861 60.2046 23.6457H72.188L72.1899 23.6448ZM72.6313 19.8088C72.6474 19.8892 72.6616 19.9705 72.6748 20.0527H60.2604C60.7368 17.0524 63.3335 14.7591 66.4681 14.7591C69.6026 14.7591 72.0575 16.9295 72.6323 19.8088H72.6313Z" fill="#1a82e2"/>
                      <path d="M147.434 23.6448H153.937C154.009 23.1031 154.047 22.5511 154.047 21.9905C154.047 15.211 148.807 9.69902 142.059 9.56289C141.974 9.561 141.89 9.56006 141.805 9.56006C134.94 9.56006 129.375 15.1249 129.375 21.9905C129.375 28.8561 134.94 34.421 141.805 34.421C141.89 34.421 141.975 34.4191 142.059 34.4182C142.147 34.4201 142.236 34.421 142.325 34.421C147.356 34.421 151.716 31.6674 153.86 27.6462C153.568 27.5753 153.276 27.5034 152.983 27.4325C151.327 27.0289 149.67 26.6243 148.014 26.2207C146.7 28.2719 144.18 29.5736 141.71 29.4119C138.732 29.2163 135.741 26.8861 135.449 23.6457H147.432L147.434 23.6448ZM147.876 19.8088C147.892 19.8892 147.906 19.9705 147.919 20.0527H135.505C135.981 17.0524 138.578 14.7591 141.712 14.7591C144.847 14.7591 147.302 16.9295 147.877 19.8088H147.876Z" fill="#1a82e2"/>
                      <path d="M101.017 10.3163V13.0292C98.9696 10.8816 96.1885 9.56006 93.1239 9.56006C86.8331 9.56006 81.7333 15.1249 81.7333 21.9905C81.7333 28.8561 86.8331 34.421 93.1239 34.421C96.1885 34.421 98.9696 33.1004 101.017 30.9518V33.8538H107.161V10.3163H101.017ZM94.5419 29.0329C90.7569 29.0329 87.6886 25.9012 87.6886 22.0378C87.6886 18.1744 90.7569 15.0427 94.5419 15.0427C97.5403 15.0427 100.087 17.0089 101.017 19.7464C101.261 20.4648 101.395 21.2352 101.395 22.0378C101.395 22.8403 101.261 23.6107 101.017 24.3292C100.087 27.0667 97.5403 29.0329 94.5419 29.0329Z" fill="#1a82e2"/>
                      <path d="M47.9462 10.8702C46.2919 11.7616 45.4327 13.0906 45.0565 13.8043V10.4108H39.0067V33.8538H45.0565V22.0094C45.2559 20.703 45.6217 19.7029 45.9101 19.044C46.3695 17.9976 46.7769 17.1034 47.7515 16.4265C48.8159 15.6883 49.9927 15.6013 50.627 15.554C51.5931 15.4822 52.3881 15.6212 52.9014 15.7488V10.2208C52.3559 10.0931 50.195 9.65642 47.9452 10.8692L47.9462 10.8702Z" fill="#1a82e2"/>
                      <path d="M126.2 28.3472C124.692 29.1299 122.995 29.1158 121.811 28.2603C121.126 27.7649 120.779 27.1089 120.608 26.6873V15.5632H127.646V10.3415H120.608V2.85107H114.819V10.3424H110.676V15.5642H114.819V26.6883C114.787 27.8179 114.921 29.8777 116.288 31.5754C118.568 34.4046 123.405 35.1457 127.973 32.912C127.382 31.3911 126.791 29.8701 126.199 28.3482L126.2 28.3472Z" fill="#1a82e2"/>
                      <path d="M171.77 17.1343C173.56 16.6239 175.35 16.1143 177.142 15.6039C176.945 15.136 176.608 14.4402 176.048 13.6991C173.168 9.88399 168.043 9.69871 166.891 9.69304C164.053 9.67792 161.956 10.6856 161.368 10.9805C160.68 11.3265 160.137 11.6829 159.756 11.9579C159.476 12.1829 157.279 14.0101 157.388 16.8384C157.468 18.8925 158.716 20.2717 159.09 20.6829C160.139 21.8371 161.325 22.3315 162.107 22.6557C162.451 22.7984 163.156 22.9913 164.568 23.376C166.245 23.8335 167.809 24.2466 167.809 24.2466C168.427 24.43 169.295 24.7041 170.33 25.087C171.204 25.3791 171.82 26.0304 171.896 26.762C171.987 27.6241 171.294 28.2593 170.99 28.5382C169.877 29.5582 168.382 29.5203 167.539 29.4986C165.527 29.4476 164.138 28.5287 163.847 28.3283C162.48 27.3897 161.828 26.1892 161.566 25.6277C159.836 26.1674 158.106 26.7081 156.375 27.2479C156.543 27.8472 156.854 28.7206 157.455 29.6489C158.521 31.2928 159.87 32.1454 160.786 32.7097C161.354 33.0595 162.461 33.6749 163.937 34.0898C168.689 35.4274 173.863 33.7287 176.097 31.3608C176.757 30.6622 177.162 29.9032 177.201 29.8285C177.469 29.3209 178.195 27.8878 177.952 25.9878C177.888 25.4849 177.635 24.0169 176.481 22.7171C176.202 22.4024 175.546 21.7331 173.45 20.8266C172.899 20.5884 172.464 20.4333 172.301 20.3728C171.566 20.1053 170.859 19.8879 169.229 19.4606C168.977 19.3945 168.793 19.3482 168.646 19.3103C168.262 19.2139 167.982 19.144 167.957 19.1383C166.453 18.7659 163.634 18.0682 163.415 16.8063C163.29 16.0794 164.068 15.3836 164.271 15.2021C166.175 13.5025 169.596 14.8902 170.441 15.5888C171.007 16.0576 171.456 16.6664 171.456 16.6664C171.599 16.8602 171.704 17.0265 171.77 17.1362V17.1343Z" fill="#1a82e2"/>
                      </g>
                      <defs>
                      <clipPath id="clip0_4479_16386">
                      <rect width="177.75" height="34.2192" fill="white" transform="translate(0.25 0.390625)"/>
                      </clipPath>
                      </defs>
                      </svg>
                  </a>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
          </td>
        </tr>
        <!-- end logo -->

        <!-- start hero -->
        <tr>
          <td align="center" bgcolor="#e9ecef">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                  <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px; text-transform: capitalize;">${variantsActionTypes[actionType]}</h1>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
          </td>
        </tr>
        <!-- end hero -->

        <!-- start copy block -->
        <tr>
          <td align="center" bgcolor="#e9ecef">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

              <!-- start copy -->
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                  <p style="margin: 0;">Tap the button below to ${variantsActionTypes[actionType]}. If you didn't create an account with <a href=${process.env.FRONTEND_APP_URL}>Qreates</a>, you can safely delete this email.</p>
                </td>
              </tr>
              <!-- end copy -->

              <!-- start button -->
              <tr>
                <td align="left" bgcolor="#ffffff">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                        <table border="0" cellpadding="0" cellspacing="0">
                          <tr>
                            <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                              <a href=${link} target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Verify Email</a>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <!-- end button -->

              <!-- start copy -->
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                  <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                  <p style="margin: 0;"><a href=${link} target="_blank">${link}</a></p>
                </td>
              </tr>
              <!-- end copy -->

              <!-- start copy -->
              <tr>
                <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                  <p style="margin: 0;">Cheers,<br> Qreates</p>
                </td>
              </tr>
              <!-- end copy -->

            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
          </td>
        </tr>
        <!-- end copy block -->

        <!-- start footer -->
        <tr>
          <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

              <!-- start permission -->
              <tr>
                <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                  <p style="margin: 0;">You received this email because we received a request for verify for your account. If you didn't request verify you can safely delete this email.</p>
                </td>
              </tr>
              <!-- end permission -->

            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
          </td>
        </tr>
        <!-- end footer -->

      </table>
      <!-- end body -->

    </body>
    </html> 
  `;
};
