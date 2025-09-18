FactoryBot.define do
  factory :building do
    address { "MyString" }
    state { "MyString" }
    zip { "MyString" }
    client { nil }
    custom_data { "" }
  end
end
