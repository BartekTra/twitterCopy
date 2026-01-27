# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
# db/seeds.rb
require 'open-uri'
Like.destroy_all
Follow.destroy_all
Tweet.destroy_all
User.destroy_all

USER_COUNT = 30
TWEETS_PER_USER = 5
REPLIES_COUNT = 100
LIKES_COUNT = 200

users = []
test_user = User.create!(
  email: 'test@example.com',
  nickname: 'test_user',
  password: 'password',
  display_name: 'Testowy Użytkownik',
  bio: 'To jest konto do testowania aplikacji.'
)

test_user_avatar = Faker::Avatar.image(slug: test_user.nickname, size: "300x300", format: "png")
downloaded_image = URI.open(test_user_avatar)
test_user.avatar.attach(io: downloaded_image, filename: "avatar_#{test_user.nickname}.png")

users << test_user

(USER_COUNT - 1).times do
  user = User.create!(
    email: Faker::Internet.unique.email,
    nickname: Faker::Internet.unique.username(specifier: 5..15),
    password: 'password',
    display_name: Faker::Name.name,
    bio: Faker::Quote.famous_last_words
  )

  users << user

  avatar_url = Faker::Avatar.image(slug: user.nickname, size: "300x300", format: "png")

  begin
    downloaded_image = URI.open(avatar_url)
    user.avatar.attach(io: downloaded_image, filename: "avatar_#{user.nickname}.png")
  end
end


users.each do |user|
  potential_follows = users.reject { |u| u == user }.sample(rand(3..10))

  potential_follows.each do |target_user|
    Follow.create!(
      follower: user,
      followed: target_user,
      created_at: Faker::Time.backward(days: 30)
    )
  end
end

users.each do |user|
  rand(1..TWEETS_PER_USER).times do
    user.tweets.create!(
      content: Faker::Lorem.sentence(word_count: rand(5..15)),
      created_at: Faker::Time.backward(days: 14)
    )
  end
end


all_tweets = Tweet.all.to_a

REPLIES_COUNT.times do
  parent = all_tweets.sample
  author = users.sample

  reply = Tweet.create!(
    user: author,
    content: Faker::Hacker.say_something_smart,
    parent_tweet: parent,
    created_at: parent.created_at + rand(1..24).hours
  )
  all_tweets << reply
end

LIKES_COUNT.times do
  user = users.sample
  tweet = all_tweets.sample
  unless Like.exists?(user: user, tweet: tweet)
    Like.create!(
      user: user,
      tweet: tweet,
      created_at: Faker::Time.between(from: tweet.created_at, to: Time.now)
    )
  end
end

puts "   - #{User.count} użytkowników"
puts "   - #{Follow.count} relacji follow"
puts "   - #{Tweet.where(parent_tweet_id: nil).count} tweetów głównych"
puts "   - #{Tweet.where.not(parent_tweet_id: nil).count} odpowiedzi (replies)"
puts "   - #{Like.count} lajków"
