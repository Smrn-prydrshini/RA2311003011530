# STAGE 1

##Approach

Priority was assigned using different weights-
1) placements=3
2) result=2
3) event=1

all the notifications recieved are sorted based on priority weight and recency

the top 10 notifications are then selected after sorting all of the notifications

# efficient maintainance
for new incoming notifications,
- maintaining a min heap
- instert new notification
- remove lest priority when heap gets full