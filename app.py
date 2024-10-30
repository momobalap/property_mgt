from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
from sqlalchemy import not_
from sqlalchemy.orm import column_property, aliased
from flask_migrate import Migrate
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import json

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173", "http://localhost:3000"], "supports_credentials": True}})

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///property.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'your-secret-key'

db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# ... (rest of your models remain the same)

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'success': False, 'message': 'No data provided'}), 400
            
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'success': False, 'message': 'Email and password are required'}), 400
        
        user = User.query.filter_by(email=email).first()
        
        if user and user.check_password(password):
            access_token = create_access_token(identity=user.id)
            return jsonify({
                'success': True,
                'message': 'Login successful',
                'access_token': access_token,
                'user': {
                    'id': user.id,
                    'email': user.email,
                    'user_type': user.user_type,
                    'role': user.role.name if user.role else None
                }
            })
        else:
            return jsonify({'success': False, 'message': 'Invalid credentials'}), 401
    except Exception as e:
        print(f"Login error: {str(e)}")
        return jsonify({'success': False, 'message': 'Server error'}), 500

@app.route('/api/user', methods=['GET'])
@jwt_required()
def get_user_data():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if user:
            return jsonify({
                'id': user.id,
                'email': user.email,
                'user_type': user.user_type,
                'role': user.role.name if user.role else None,
                'permissions': [perm.name for perm in user.role.permissions] if user.role else []
            })
        else:
            return jsonify({'error': 'User not found'}), 404
    except Exception as e:
        print(f"Get user error: {str(e)}")
        return jsonify({'error': 'Server error'}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        init_sample_data()
    app.run(debug=True, port=5000)