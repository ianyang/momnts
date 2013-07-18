Event.delete_all
User.delete_all

Event.create(date: '2013-08-01', time: '13:00', duration: 30, topic: 'whatever you want', creator_identifier: 'blue jeans', location: 'Cafe Du Soleil', address: '345 3rd St,(b/t Folsom St & Saint Francis Pl),SoMa,San Francisco, CA 94107')