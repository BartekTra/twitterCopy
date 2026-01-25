class ApplicationController < ActionController::API
        include DeviseTokenAuth::Concerns::SetUserByToken
        include ActionController::Cookies

        before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    # Dopuszczamy :avatar podczas rejestracji
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :name, :avatar ])

    # Dopuszczamy :avatar podczas edycji profilu
    devise_parameter_sanitizer.permit(:account_update, keys: [ :name, :avatar ])
  end
end
