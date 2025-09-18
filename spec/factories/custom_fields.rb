FactoryBot.define do
  factory :custom_field do
    client { nil }
    name { "MyString" }
    field_type { "MyString" }
    validations { "" }
  end
end
