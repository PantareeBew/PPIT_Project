# PPIT_Project

## Mysql file

Drop database if exists PPit;
Show databases;
create database PPit CHARACTER SET utf8 COLLATE UTF8_GENERAL_CI ;
Use PPit;
Show tables;
___

--Food table
Drop table if exists food;
--SET SESSION auto_increment_increment=1; # increment value	

create table food (
fid int(3) NOT NULL ,  
fname varchar(45) NOT NULL, -- maximum column length is 45 characters
ingredient varchar(1000) NOT NULL,
method varchar(2000) NOT NULL,
PRIMARY KEY (fid)
);
___

select * from food;
Insert into food (fid,fname,ingredient,method) values 
(1,'Tom Kha', 
'1 stalk lemongrass
3 to 4 cups chicken stock
3 cloves garlic, minced
1/2 teaspoon dried crushed chile, or to taste
3 makrut lime leaves
1/2 to 3/4 cup fresh shiitake mushrooms, thinly sliced
12 to 14 medium or large raw shrimp, peeled
1 green or red bell pepper, sliced
1 handful cherry tomatoes, optional
1/2 (13.5-ounce) can coconut milk, or to taste
2 tablespoons fish sauce
Sprig fresh cilantro, roughly chopped, garnish',
'1.Gather the ingredients
2.Prepare the lemongrass: Finely mince the lower third of the stalk and keep the upper part whole
3.In a deep cooking pot, pour the chicken stock and turn heat to medium-high. Add prepared lemongrass to the pot, including upper parts of the stalk you did not mince. Boil 5 to 6 minutes, or until fragrant
4.Reduce heat slightly to achieve a nice simmer. Add garlic, chili, lime leaves, and mushrooms to broth. Continue simmering for another 5 minutes
5.Add shrimp, bell pepper, and cherry tomatoes (if using). Simmer 5 to 6 minutes, or until the shrimp are pink and plump
6.Turn down the heat to low and add coconut milk and fish sauce. Taste-test and adjust as needed
7.Serve in bowls with fresh cilantro sprinkled over as a garnish
'),
(2,'Tom yum',
'700ml chicken stock\,
1 lemongrass stalk, bruised and cut into large pieces\,
5 thick slices galangal\,
3 coriander roots or 6 stems, bruised, plus leaves to garnish\,
3 lime leaves, torn\,
6 large prawns, shelled\,
3 tbsp Thai fish sauce\,
6 small green chillies, chopped\,
4 tbsp lime juice',
'
1.Bring the stock to a boil in a medium-sized saucepan. Add the lemongrass, galangal, coriander roots and lime leaves, then simmer for 2 mins.\,
2.Add the prawns, fish sauce, chillies and lime juice, then return to the boil. Taste and adjust the seasoning with either more lime juice or fish sauce, then garnish with coriander leaves and serve.
'),
(3,'Pad Thai',
'
200g dried flat rice noodles
2 tbsp tamarind paste
3 tbsp fish sauce
1 tbsp light brown soft sugar
1 lime , half juiced, half cut into wedges to serve
pinch chilli powder (optional)
4 tbsp sunflower oil
100g firm tofu , diced
200g raw king prawns , butterflied
100g beansprouts
2 eggs
100g salted roasted peanuts , chopped
2 spring onions , shredded
2 tbsp chopped pickled turnip (preserved radish)
',
'
1.Soak the noodles in warm water for about 20 mins until softened but with plenty of bite, then drain. Meanwhile, mix together the tamarind paste, fish sauce, sugar and lime juice until the sugar dissolves. Season with a pinch of chilli powder if you like it spicy. Can be made up to two weeks ahead and kept in the fridge. If you make pad Thai regularly, double the quantity and keep half.
2.Heat half the oil in a frying pan and cook the tofu on each side until golden. Add the prawns and fry until they just start to turn pink. Tip the noodles into the pan and drizzle over the tamarind mixture with about 5 tbsp of water. Stir everything together and cook over a high heat for 3 mins until the noodles are just cooked. Add a splash more water if needed.
3.When the sauce has reduced, scatter over the beansprouts and fold them into the noodles. Push everything to one side of the pan, then pour in the rest of the oil on the empty side and crack in the eggs. Fry for 2 mins until the white is just set and beginning to crisp around the edges, then roughly scramble the runny yolks in with the whites. When the eggs have just set, combine with the noodles.
4.Scatter over half of the peanuts, half the spring onion and all the turnip, and quickly toss together. Divide between two plates with the remaining peanuts, spring onion, chilli powder, lime wedges and soy sauce on the side, to garnish as preferred.
'),
(4,'Red Curry',
'
1 tbsp vegetable oil
1 tbsp ginger & garlic paste
5-6 tbsp red curry paste
800ml coconut milk
8 skinless, boneless chicken thighs, cut into large chunks
kaffir lime leaves (ideally fresh)
2 tbsp fish sauce
1 tsp brown sugar
½ small pack Thai basil
basil or coriander, plus extra to serve
1 red chilli, sliced diagonally
thumb-sized piece ginger, cut into matchsticks
',
'
1.Heat 1 tbsp vegetable oil in a large saucepan over a medium heat and fry 1 tbsp ginger and 1 tbsp garlic paste for 2 mins. Add 5-6 tbsp red curry paste, sizzle for a few secs, then pour in 800ml coconut milk.
2.Bring to the boil, reduce to a simmer, stir a little and wait for the oil to rise to the surface.
3.Add 8 skinless, boneless chicken thighs, cut into chunks, and kaffir lime leaves, and simmer for 12 mins or until the chicken is cooked through.
4.Add 1 tbsp of the fish sauce and a pinch of brown sugar, then taste – if you like it a little saltier, add more fish sauce; if you like it sweeter, add a little more sugar.
5.Bring to the boil, take off the heat and add ½ small pack Thai basil.
6.Spoon the curry into four bowls and top with 1 red chilli, a thumb-sized piece of ginger and a few extra basil leaves. Serve with jasmine rice.
'),
(5,'Green Curry',
'
225g new potatoes, cut into chunks
100g green beans, trimmed and halved
1 tbsp vegetable or sunflower oil
1 garlic clove, chopped
1 rounded tbsp or 4 tsp Thai green curry paste (you cannot fit the tablespoon into some of the jars)
400ml can coconut milk
2 tsp Thai fish sauce
1 tsp caster sugar
450g boneless skinless chicken (breasts or thighs), cut into bite-size pieces
2 fresh kaffir lime leaves finely shredded, or 3 wide strips lime zest, plus extra to garnish
good handful of basil leaves
',
'
1.Put 225g new potatoes, cut into chunks, in a pan of boiling water and cook for 5 minutes.
2.Add 100g trimmed and halved green beans and cook for a further 3 minutes, by which time both should be just tender but not too soft. Drain and put to one side.
3.In a wok or large frying pan, heat 1 tbsp vegetable or sunflower oil until very hot, then drop in 1 chopped garlic clove and cook until golden, this should take only a few seconds. Don’t let it go very dark or it will spoil the taste.
4.Spoon in 1 rounded tbsp Thai green curry paste and stir it around for a few seconds to begin to cook the spices and release all the flavours.
5.Next, pour in a 400ml can of coconut milk and let it come to a bubble.
6.Stir in 2 tsp Thai fish sauce and 1 tsp caster sugar, then 450g bite-size chicken pieces. Turn the heat down to a simmer and cook, covered, for about 8 minutes until the chicken is cooked.
7.Tip in the potatoes and beans and let them warm through in the hot coconut milk, then add 2 finely shredded kaffir lime leaves (or 3 wide strips lime zest).
8.Add a good handful basil leaves, but only leave them briefly on the heat or they will quickly lose their brightness.
9.Scatter with lime to garnish and serve immediately with boiled rice.
');

___
--Supplier
Drop table if exists supplier;
create table supplier (
sid int(3) ,    
sname varchar(45) NOT NULL, -- maximum column length is 45 characters
product varchar(200) NOT NULL,
dday ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') ,
phoneNo int(10) zerofill NOT NULL,
PRIMARY KEY (sid)
);

___
select * from supplier;
Insert into supplier (sid,sname,product,dday,phoneNo) values 
(1,'Corrib Food Product','Chicken, Duck', 'Thursday', 0818227000),
(2,'Pallas Food', 'Pepper, Potato, Carrot, Broccoli, Onion, Garlic', 'Wednesday', 0814566550),
(3,'Jasmine', 'Chili, Lemongrass, Galangal, Ginger, Egg, Tofu', 'Wednesday', 0910539912),
(4,'Collerans Butchers', 'Beef, Pork', 'Friday', 0917795931);

___
Drop table if exists employee;
create table employee (
Empno Int(3) zerofill, -- see Numbers.sql next week
name varchar(45) not null,
lname varchar(45) not null,
job varchar(45) not null,
hiredate date not null,
salary int(10) NOT NULL,
PRIMARY KEY (Empno)
);
___
select * from employee;
Insert into employee (Empno,name,lname, job, hiredate, salary) values 
(101,'Brian', 'Waldron', 'Manager', '2015-09-16', 2500),
(102,'John', 'Walsh', 'Head_Chef', '2015-10-1', 2500),
(103,'Jane', 'Weelch', 'Cashier', '2016-06-15', 2000),
(104,'Eoin', 'Oconnor', 'Chef', '2015-12-1', 2200),
(105,'Bella', 'Doherty', 'Waiter', '2015-12-2', 2000),
(106,'Connor', 'Doherty', 'Chef', '2018-05-20', 2100),
(107,'Shawn', 'Mendes', 'Waiter', '2019-03-02', 1800),
(108,'James', 'Boyle', 'Kitchen_Porter', '2019-07-19', 1600);

___
--Booking
Drop table if exists booking;
create table booking (
bookingNo Int(3) , -- see Numbers.sql next week
bookingDate date not null,
name varchar(45) not null,
quantity int(10) NOT NULL,
bookedBy ENUM ('Email','Phone'),  
phone int(10) zerofill NOT NULL,
tableNo int(20) NOT NULL,

PRIMARY KEY (bookingNo)
)auto_increment=1 ;

___
select * from booking;
Insert into booking (bookingNo,bookingDate,name, quantity, bookedBy, phone, tableNo) values 
(1,'2021-03-08', 'John', 4, 'Email', 0906625460, 9),
(2,'2021-03-08', 'David', 9, 'Phone', 0876802487, 1),
(3,'2021-03-09', 'Emma', 2, 'Phone', 0949024362, 14),
(4,'2021-03-10', 'Brian', 2, 'Email', 0871235990, 17),
(5,'2021-03-11', 'Eimar', 5, 'Phone', 0851811555, 10),
(6,'2021-03-11', 'Marie', 4, 'Phone', 0924771618, 9),
(7,'2021-03-12', 'Anne', 10, 'Email', 0841649333, 1),
(8,'2021-03-12', 'Brian', 2, 'Phone', 0899932662, 14),
(9,'2021-03-12', 'James', 6, 'Phone', 0926624518, 2),
(10,'2021-03-13', 'Clara', 7, 'Phone', 0821456258, 1),
(11,'2021-03-13', 'Sean', 4, 'Email', 0812549696, 10),
(12,'2021-03-13', 'Joy', 2, 'Phone', 0974586636, 15);




















