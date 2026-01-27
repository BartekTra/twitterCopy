# app/models/follow.rb
class Follow < ApplicationRecord
  belongs_to :follower, class_name: "User"
  belongs_to :followed, class_name: "User"
  
  # To uruchomi się przy odobserwowaniu (np. wyczyść statystyki)
  after_destroy :cleanup_stats




end
