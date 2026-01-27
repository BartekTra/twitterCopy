# app/controllers/api/v1/users_controller.rb
module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_api_v1_user!

      def current
        render json: serialize_user(current_api_v1_user), status: :ok
      end

      private

      def serialize_user(user)
        {
          id: user.id,
          email: user.email,
          display_name: user.display_name,
          nickname: user.nickname,
          confirmed: user.confirmed?,
          avatar_url: user.avatar_url
        }
      end
    end
  end
end
