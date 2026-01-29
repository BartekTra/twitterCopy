class Tweet < ApplicationRecord
  belongs_to :user

  belongs_to :parent_tweet, class_name: "Tweet", optional: true, counter_cache: :replies_counter
  has_many :replies, class_name: "Tweet", foreign_key: :parent_tweet_id

  has_many :likes


end
