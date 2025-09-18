ActiveRecord::Base.transaction do
  Client.destroy_all

  puts "Creating clients"
  ursula = Client.create!(name: "Ursula's Seaside Properties")
  jafar = Client.create!(name: "Jafar's Desert Dwellings")
  maleficent = Client.create!(name: "Maleficent's Manor Management")
  scar = Client.create!(name: "Scar's Pride Rock Properties")
  cruella = Client.create!(name: "Cruella's Chic Condos")

  puts "Creating unique features"
  CustomField.create!(client: ursula, name: 'has_ocean_view', field_type: 'enum', validations: { enum_values: ['Yes', 'No', 'Only at high tide'] })
  CustomField.create!(client: ursula, name: 'last_plumbing_check', field_type: 'freeform')
  CustomField.create!(client: ursula, name: 'number_of_garden_eels', field_type: 'number')

  CustomField.create!(client: jafar, name: 'ac_unit_brand', field_type: 'freeform')
  CustomField.create!(client: jafar, name: 'has_working_ice_maker', field_type: 'enum', validations: { enum_values: ['Yes', 'No', 'It tries its best'] })
  CustomField.create!(client: jafar, name: 'number_of_palm_trees', field_type: 'number')
  
  CustomField.create!(client: maleficent, name: 'rose_bush_count', field_type: 'number')
  CustomField.create!(client: maleficent, name: 'is_it_haunted', field_type: 'enum', validations: { enum_values: ['Definitely Not', 'Probably', 'Yes, but the ghost is friendly'] })
  CustomField.create!(client: maleficent, name: 'garden_gnome_situation', field_type: 'freeform')
  
  CustomField.create!(client: scar, name: 'view_rating_out_of_10', field_type: 'number')
  CustomField.create!(client: scar, name: 'patio_furniture_included', field_type: 'enum', validations: { enum_values: ['Yes', 'No', 'Just one sad chair'] })
  
  CustomField.create!(client: cruella, name: 'parking_spot_number', field_type: 'number')
  CustomField.create!(client: cruella, name: 'allows_pets', field_type: 'enum', validations: { enum_values: ['Yes', 'No', 'Only non-spotted ones'] })
  CustomField.create!(client: cruella, name: 'interior_color_scheme', field_type: 'freeform')

  puts "Creating questionable properties"
  Building.create!(
    client: ursula,
    address: '12 Tidalpool Terrace',
    state: 'CA',
    zip: '90265',
    custom_fields: {
      has_ocean_view: 'Only at high tide',
      last_plumbing_check: 'Last Tuesday',
      number_of_garden_eels: 2
    }
  )

  Building.create!(
    client: jafar,
    address: '45 Sunbeam St',
    state: 'AZ',
    zip: '85258',
    custom_fields: {
      ac_unit_brand: 'Genie Air',
      has_working_ice_maker: 'It tries its best',
      number_of_palm_trees: 3
    }
  )
  
  Building.create!(
    client: maleficent,
    address: '13 Thornbush Rd',
    state: 'PA',
    zip: '18901',
    custom_fields: {
      rose_bush_count: 40,
      is_it_haunted: 'Yes, but the ghost is friendly',
      garden_gnome_situation: 'Under control'
    }
  )

  Building.create!(
    client: scar,
    address: '10 Overlook Ridge',
    state: 'CO',
    zip: '80401',
    custom_fields: {
      view_rating_out_of_10: 9,
      patio_furniture_included: 'Just one sad chair'
    }
  )

  Building.create!(
    client: cruella,
    address: '101 Monochrome Blvd, Unit 3B',
    state: 'NY',
    zip: '10021',
    custom_fields: {
      parking_spot_number: 77,
      allows_pets: 'Only non-spotted ones',
      interior_color_scheme: 'Black, white, and a splash of red'
    }
  )

  Building.create!(
    client: jafar,
    address: '88 Sandy Court',
    state: 'AZ',
    zip: '85259',
    custom_fields: {
      ac_unit_brand: 'Sultan Cooling Co.',
      has_working_ice_maker: 'Yes',
      number_of_palm_trees: 5
    }
  )
end

puts "Seeding complete"