module Api
  module V1
    module Auth
      class RegistrationsController < DeviseTokenAuth::SessionsController
        # POST /api/v1/auth/sign_in
        def create
          user = User.find_by(email: params[:email])

          if user&.valid_password?(params[:password])
            unless user.confirmed?
              render json: { status: "error", message: "Confirm email" }, status: :unauthorized
              return
            end

            sign_in(:user, user)
            render json: {
              status: "success",
              data: user.as_json(only: [ :id, :email, :first_name, :surname, :nickname ])
            }
          else
            render json: { status: "error", message: "Invalid credentials" }, status: :unauthorized
          end
        end

        # DELETE /api/v1/auth/sign_out
        def destroy
          client_id = request.headers["client"]
          token = request.headers["access-token"]

          if current_api_v1_user && client_id && current_api_v1_user.tokens[client_id]
            # Verify token matches
            stored_token = current_api_v1_user.tokens[client_id]

            if stored_token && BCrypt::Password.new(stored_token["token"]) == token
              current_api_v1_user.tokens.delete(client_id)
              current_api_v1_user.save

              render json: {
                status: "success",
                message: "Signed out successfully"
              }, status: :ok
            else
              render json: {
                status: "error",
                message: "User not signed in"
              }, status: :unauthorized
            end
          else
            render json: {
              status: "error",
              message: "User not signed in"
            }, status: :unauthorized
          end
        end
      end
    end
  end
end
