class Tweet < ApplicationRecord
  belongs_to :user

  belongs_to :parent_tweet, class_name: "Tweet", optional: true, counter_cache: :replies_counter
  has_many :replies, class_name: "Tweet", foreign_key: :parent_tweet_id

  has_many :likes

  has_many_attached :attachments
  validates :content, presence: true, unless: -> { attachments.attached? }
  validate :validate_attachment_limit
  validate :validate_attachment_content_type

  def ancestors
    chain = []
    current = self

    while current.parent_tweet
      current = Tweet.includes(:user).find(current.parent_tweet_id)
      chain.unshift(current)
    end

    chain
  end

  def attachments_urls
    attachments.map do |attachment|
      Rails.application.routes.url_helpers.url_for(attachment)
    end
  end

  private
  def validate_attachment_limit
    if attachments.length > 4
      errors.add(:attachments, "mozesz dodac max 4 pliki")
    end
  end

  def validate_attachment_content_type
    attachments.each do |attachment|
      unless attachment.content_type.in?(%w[image/jpeg image/png image/gif video/mp4])
        errors.add(:attachments, "nieprawidlowy format pliku")
      end
    end
  end
end
