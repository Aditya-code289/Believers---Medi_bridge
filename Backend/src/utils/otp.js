export function generateotp(){
    return Math.floor(100000 + Math.random() * 900000).toString();
}

export function getOtphtml(otp){
    return `
    <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 5px; text-align: center;">
        <h2 style="color: #333;">Your OTP Code</h2>
        <p style="font-size: 18px; color: #555;">Use the following OTP to complete your authentication process:</p>
        <div style="font-size: 24px; font-weight: bold; color: #007BFF; margin: 20px 0;">${otp}</div>
        <p style="font-size: 14px; color: #999;">This OTP is valid for the next 10 minutes. Please do not share it with anyone.</p>
    </div>
    `;
}   