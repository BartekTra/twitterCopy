module Api
  module V1
    class TweetsController < ApplicationController
      before_action :authenticate_api_v1_user!, only: [ :create, :update, :destroy ]

      def index
        @tweets = Tweet.with_attached_attachments.includes(:user).where(parent_tweet_id: nil).order(created_at: :desc)

        render json: @tweets, include: {
          user: {
            only: [ :id, :nickname, :display_name ],
            methods: [ :avatar_url ]
          }
        }, methods: [ :attachments_urls ]
      end

      def show
        @tweet = Tweet.includes(:user, replies: :user).find(params[:id])

        ancestors_data = @tweet.ancestors.as_json(
          include: {
            user: {
              only: [ :id, :nickname, :display_name ],
              methods: [ :avatar_url ]
            }
          }
        )

        render json: @tweet.as_json(
          include: [
            { user: { methods: [ :avatar_url ] } },
            { replies: { include: { user: { methods: [ :avatar_url ] } } } }
          ],
          methods: [ :attachments_urls ]
        ).merge({ ancestors: ancestors_data })
      end

      def create
        @tweet = Tweet.new(tweet_params)
        @tweet.user = current_api_v1_user

        if @tweet.save
          render json: {
            status: :success,
            data: @tweet.as_json(
              only: [ :id, :content, :parent_tweet_id, :likes_count, :retweets_count, :created_at, :updated_at ],
              include: { user: { methods: [ :avatar_url ] } },
              methods: [ :attachments_urls ]
            )
          }, status: :created
        else
          render json: {
            status: :error,
            errors: @tweet.errors.full_messages
          }, status: :unprocessable_entity
        end
      end

      def edit
        @tweet = Tweet.find(params[:id])
      end

      def update
        @tweet = Tweet.find(params[:id])
        if @tweet.user_id == current_api_v1_user.id && @tweet.update(tweet_params)
          render json: {
            status: :success,
            data: @tweet.as_json(:user_id, :content, :parent_tweet_id, :likes_count, :retweets_count, :created_at, :updated_at)
          }
        else
          render json: { status: :error, message: "Unauthorized or validation failed" }, status: 401
        end
      end

      def destroy
        @tweet = Tweet.find(params[:id])
        if @tweet.user_id == current_api_v1_user.id
          @tweet.destroy
          render json: { status: :success }
        else
           render json: { status: :error, message: "Unauthorized" }, status: 401
        end
      end

      private

      def tweet_params
        params.require(:tweet).permit(:content, :parent_tweet_id, attachments: [])
      end
    end
  end
end
