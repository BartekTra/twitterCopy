module Api
  module V1
      class SessionsController < DeviseTokenAuth::SessionsController
        before_action :authenticate_api_v1_user, only: ["destroy"]
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
              data: user.as_json(only: [ :id, :email, :nickname, :avatar ])
            }
          else
            render json: { status: "error", message: "Invalid credentials" }, status: :unauthorized
          end
        end

        # DELETE /api/v1/auth/sign_out
        def destroy
          client_id = request.headers["client"]
          current_api_v1_user.tokens.delete(client_id)
          current_api_v1_user.save
            render json: {
              status: "success",
              message: "Signed out successfully"
            }, status: :ok
        end
      end
    end

end
