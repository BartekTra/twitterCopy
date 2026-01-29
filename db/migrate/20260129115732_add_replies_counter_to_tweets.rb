class AddRepliesCounterToTweets < ActiveRecord::Migration[7.2]
  def change
    add_column :tweets, :replies_counter, :integer, default: 0, null: false
  end
end
