require 'rails_helper'

RSpec.describe Building, type: :model do
	let(:client) { Client.new(name: 'Test Client') }
	let(:valid_attributes) { { address: '123 Main St', state: 'CA', zip: '90210', client: client } }
	subject { described_class.new(valid_attributes) }

	describe 'validations' do
		it 'is valid with an address, state, and zip' do
			expect(subject).to be_valid
		end

		it 'is invalid without an address' do
			subject.address = nil
			expect(subject).to_not be_valid
		end

		it 'is invalid without a state' do
			subject.state = nil
			expect(subject).to_not be_valid
		end

		it 'is invalid without a zip' do
			subject.zip = nil
			expect(subject).to_not be_valid
		end
	end
end
