class CreateTweetsTable < ActiveRecord::Migration[7.2]
  def change
    create_table :tweets do |t|
      t.references :user, null: false, foreign_key: true # Autor
      t.text :content, limit: 280

      t.integer :parent_tweet_id, null: true, index: true

      t.integer :likes_count, default: 0
      t.integer :retweets_count, default: 0

      t.timestamps
    end
  end
end
