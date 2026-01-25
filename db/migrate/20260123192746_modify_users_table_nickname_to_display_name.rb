class ModifyUsersTableNicknameToDisplayName < ActiveRecord::Migration[7.2]
  def change
    rename_column :users, :name, :display_name
  end
end
