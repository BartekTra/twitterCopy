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
          name: user.name,
          nickname: user.nickname,
          image: user.image,
          provider: user.provider,
          uid: user.uid,
          confirmed: user.confirmed?,
          created_at: user.created_at,
          updated_at: user.updated_at
        }
      end
    end
  end
end