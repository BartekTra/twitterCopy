class MakeUsernameUsersUnique < ActiveRecord::Migration[7.2]
  def change
    add_index :users, :nickname, unique: true
  end
end
