from flask_wtf import FlaskForm
from flask_wtf.file import FileAllowed
from wtforms import StringField, PasswordField, SubmitField, BooleanField,FileField, DecimalField
from wtforms.validators import DataRequired, Length, Email, equal_to, NumberRange

class RegistrationForm(FlaskForm):
    email = StringField('Email', 
                        validators = [DataRequired(),Email()])
    
    username = StringField('Username', 
                            validators = [DataRequired(), Length(min = 2, max = 20)])

    password = PasswordField('Password', 
                            validators = [DataRequired()])
                            
    password2 = PasswordField('Confirm password', 
                            validators = [DataRequired(), equal_to('password')])

    submit = SubmitField('Send')

class LoginForm(FlaskForm): 
    email = StringField('Email', 
                        validators = [DataRequired(),Email()])

    password = PasswordField('Password', 
                            validators = [DataRequired()])

    remember = BooleanField('Remember Me')

    submit = SubmitField('LogIn')

class UploadProduct(FlaskForm):
    name = StringField('Product name: ',
                           validators=[DataRequired(), Length(min = 0, max=40)])
    
    info = StringField('Product information: ',
                        validators=[DataRequired(), Length(min = 0, max = 1000)])
    
    picture = FileField('Upload a product image', validators=[DataRequired(), FileAllowed(['jpg', 'png'])])
    
    price = DecimalField('Price: $', rounding = None, places = 2, 
                                    validators = [DataRequired(), NumberRange(min = 1, max = None)])
    # price = IntegerField('Price', validators = [NumberRange(min = 1, max = None)])

    submit = SubmitField('Add Product')