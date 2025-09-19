require 'rails_helper'

RSpec.describe CustomField, type: :model do

	let(:client) { Client.new(name: 'Test Client') }
	let(:valid_attributes) { { name: 'Field 1', field_type: 'freeform', client: client } }
	subject { described_class.new(valid_attributes) }

	describe 'validations' do
		it 'is valid with a name and valid field_type' do
			expect(subject).to be_valid
		end

		it 'is invalid without a name' do
			subject.name = nil
			expect(subject).to_not be_valid
		end

		it 'is invalid with an unsupported field_type' do
			subject.field_type = 'unsupported'
			expect(subject).to_not be_valid
		end

		it 'is invalid when name is not unique' do
			client = Client.create!(name: 'Client A')
			CustomField.create!(name: 'Duplicate', field_type: 'freeform', client: client)
			duplicate = CustomField.new(name: 'Duplicate', field_type: 'freeform', client: client)
			expect(duplicate).to_not be_valid
		end
	end
end
