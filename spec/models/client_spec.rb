require 'rails_helper'

RSpec.describe Client, type: :model do
  subject { described_class.new(name: 'Test Client') }

  describe 'validations' do
    it 'is valid with a name' do
      expect(subject).to be_valid
    end

    it 'is invalid without a name' do
      subject.name = nil
      expect(subject).to_not be_valid
    end
  end
end
