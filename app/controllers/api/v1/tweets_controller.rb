module Api
  module V1
          class TweetsController < ApplicationController
            before_action :authenticate_api_v1_user!
    def index
      @tweets = Tweet.all
      render json: @tweets
    end

    def show
      @tweet = Tweet.find(params[:id]).includes(:user)
      render json: @tweet
    end

    def create
      @tweet = Tweet.new(tweet_params)
      @tweet.user = current_user
      if @tweet.save
        render json: {
          status: :success,
          data: tweet.as_json(:user_id, :content, :parent_tweet_id, :likes_count, :retweets_count, :created_at, :updated_at)
        }
      end
    end

    def edit
      @tweet = Tweet.find(params[:id])
    end

    def update
      @tweet = Tweet.find(params[:id])
      if @tweet.update(tweet_params)
        render json: {
          status: :success,
          data: tweet.as_json(:user_id, :content, :parent_tweet_id, :likes_count, :retweets_count, :created_at, :updated_at)
        }
      end
    end

    def destroy
      @tweet = Tweet.find(params[:id])
      @tweet.destroy
      render json: {
        status: :success
      }
    end

    private

    def tweet_params
      params.require(:tweet).permit(:content)
    end
          end
  end
end
