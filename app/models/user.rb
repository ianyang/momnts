class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  attr_accessible :name, :gender, :dob, :profession, :number, :password, :email, :password_confirmation, :remember_me

  has_many :created_events, :class_name => "Event", :foreign_key => "creator_id"
  has_many :accepted_events, :class_name => "Event", :foreign_key => "acceptor_id"

  validates_presence_of :name, :gender, :dob, :profession, :number

end
