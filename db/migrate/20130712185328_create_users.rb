class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :gender
      t.date :dob
      t.string :profession
      t.string :number
      t.string :image
      t.timestamps
    end
  end
end
