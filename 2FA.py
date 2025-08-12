from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # باش يقبل الاتصال من JavaScript

@app.route('/send-code', methods=['POST'])
def send_code():
    data = request.json
    email = data.get('email')
    code = data.get('code')

    if not email or not code:
        return jsonify({"success": False, "message": "Missing fields"}), 400

    try:
        # إعدادات Gmail
        sender = "your_email@gmail.com"
        password = "your_app_password"  # خاصك تولد App Password من Gmail

        msg = MIMEText(f"Your 2FA code is: {code}")
        msg['Subject'] = "2FA Code"
        msg['From'] = "your_email@gmail.com"
        msg['To'] = email

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender, password)
            server.send_message(msg)

        return jsonify({"success": True, "message": "Email sent!"})

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
@app.route('/confirmation', methods=['POST'])
def confirmation():
    data = request.json
    email = data.get('email')
    cart = data.get('cart')

    if not email or not cart:
        return jsonify({"success": False, "message": "Missing fields"}), 400

    try:
        # إعدادات Gmail
        sender = "your_email@gmail.com"
        password = "your_app_password"  # خاصك تولد App Password من Gmail

        order_details = "\n".join([f"- {item['serviceName']} (${item['servicePrice']})" for item in cart])
        total_price = sum(item['servicePrice'] for item in cart)
        
        msg_body = f"""
Hello,

Thank you for your order!  

Your ordered services:
{order_details}

Total: ${total_price}

We will contact you soon.

Regards,  
Your Store
"""
        msg = MIMEText(msg_body)
        msg['Subject'] = "Order Confirmation"
        msg['From'] = "your_email@gmail.com"
        msg['To'] = email

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender, password)
            server.send_message(msg)

        return jsonify({"success": True, "message": "Email sent!"})

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500    

if __name__ == '__main__':
    app.run(debug=True, port=5000)
