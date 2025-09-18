class CustomField < ApplicationRecord
  belongs_to :client

  VALID_FIELD_TYPES = ['number', 'freeform', 'enum']

  validates :name, presence: true
  validates :field_type, inclusion: { in: VALID_FIELD_TYPES }
  validates :name, uniqueness: { scope: :client_id }
end