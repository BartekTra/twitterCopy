class CreateFollowsTable < ActiveRecord::Migration[7.2]
  def change
    create_table :follows do |t|
      t.integer :follower_id, null: false # Kto obserwuje (np. Ja)
      t.integer :followed_id, null: false # Kogo obserwuje (np. Elon Musk)

      t.timestamps
    end

    # Kluczowe indeksy dla wydajności!
    add_index :follows, :follower_id
    add_index :follows, :followed_id
    # Zapobiega duplikatom (nie możesz obserwować kogoś 2 razy)
    add_index :follows, [:follower_id, :followed_id], unique: true
  end
end
