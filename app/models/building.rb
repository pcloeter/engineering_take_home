class Building < ApplicationRecord
  belongs_to :client

  validates :address, :state, :zip, presence: true
end