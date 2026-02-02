module Api
  module V1
      class RegistrationsController < DeviseTokenAuth::RegistrationsController
        def create
          super do |resource|
          if resource.persisted? && params[:avatar].present?

            resource.avatar.attach(params[:avatar])

          end


          resource.save
        end
        end
                private

        def sign_up_params
          params.permit(:email, :password, :password_confirmation, :display_name, :nickname, :avatar)
        end
      end
  end
end
