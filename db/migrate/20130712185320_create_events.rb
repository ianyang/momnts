class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.date :date
      t.time :time
      t.integer :duration
      t.text :topic
      t.text :creator_identifier
      t.text :acceptor_identifier

      t.string :location
      t.text :link
      t.text :image
      t.string :address
      t.float :latitude
      t.float :longitude

      t.integer :creator_id
      t.integer :acceptor_id
      t.timestamps
    end
  end
end
