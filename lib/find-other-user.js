const findOtherUser = function(arrayOfObjects)  {
  const usersArray = [];
  const user1Id = arrayOfObjects[0].receiver_id;
  const user1Name = arrayOfObjects[0].receiver_name;
  const user1 = {id: user1Id, name: user1Name};
  const user2Id = arrayOfObjects[0].sender_id;
  const user2Name = arrayOfObjects[0].sender_name;
  const user2 = {id: user2Id, name: user2Name};
  usersArray.push(user1);
  usersArray.push(user2);
  for (let user of usersArray) {
    if (user.id !== user_id) {
      other_user = user.name;
      other_user_id = user.id;
    }
  }
};

module.exports = findOtherUser;