class CreateLikesTable < ActiveRecord::Migration[7.2]
  def change
    create_table :likes do |t|
      t.references :user, null: false, foreign_key: true
      t.references :tweet, null: false, foreign_key: true

      t.timestamps
    end

    # Żebyś nie mógł polubić tego samego tweeta 2 razy
    add_index :likes, [:user_id, :tweet_id], unique: true
  end
end
