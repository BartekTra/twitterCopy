# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_one_attached :avatar

  has_many :tweets, dependent: :destroy
  has_many :likes

  has_many :given_follows, foreign_key: :follower_id, class_name: "Follow"
  has_many :followings, through: :given_follows, source: :followed

  has_many :received_follows, foreign_key: :followed_id, class_name: "Follow"
  has_many :followers, through: :receiver_follows, source: :follower

  def following?(user)
    followings.include?(user)
  end

  def follow(user)
    followings << user
  end

  def unfollow(user)
    followings.destroy(user)
  end

  def avatar_url
    return nil unless avatar.attached?
    Rails.application.routes.url_helpers.url_for(avatar)
  end
end
