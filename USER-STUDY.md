# Guidebook for User Study

## Methods


|Encoding Method| 
| ----------- | 
| Pitch| 
| Tempo| 
| Spatial(our approach)| 


## Experiment Procedure (with time Estimation)


## pre experiment set-up

Before the experiment, the experiment helper will help the user the adjust the user to wear a headset with tracking function. 

### Training

##### Before the testing for any of the encoding method, a comsulsery 10 mins training will be provided as it is a common procedure in use such sonification system.

The training will contains three part : 

![Screenshot 2023-04-19 at 1 01 53 PM](https://user-images.githubusercontent.com/98451647/232971501-03f1ba63-16da-4b2d-abac-87406d1773ca.png)



### a. Zero training and the bound training (2min)

##### This is the help the user understand what is the Cartesian coordinates system in the user's mind. Three values are trained: Zero, Lower bound(-1), upper bound (+1)

### b. consistent value training training ( from the -1 to 1 )  8 mins



The user will be informed by the bound of the data from each encoding method. 16 sonified and linear interpolated sample (from -1 to 1) will be played, with voice-over instruction informing the user what the value it is.  The procedure will be proceed twice, with each time from (-1 to 1) and backward (1 to -1)

### c. Random value training (3-mins)

Random sonified value will be played. 16 samples will be presented



## Experiments

For each of the method, we will have 

For one-set data only

| Test Content      | Ref Test Key | Num of graphs | Est. Time to Complete|
| ----------- | ----------- |  ----------- | ----------- | 
| Data Charastic   | 1-character |5| 5 mins|
| Trending   | 1-trend        |5| 5 mins|
| Value       | 1-val   |5| 15 mins|

Total time estimation: 25 mins



For two-set data only

| Test Content      | Ref Test Key | Num of graphs | Est. Time to Complete|
| ----------- | ----------- |  ----------- | ----------- | 
| Data Charastic   | 2-character |5|8 mins|
| Value       | 2-val   |5| 20 mins|
| Trending   | 2-trend        |5| 8 mins|

Total time estimation 35mins

## Post Experiment Questionaire 

The questionaire will ask about the cognitive feeling of the users according to the 3 systems, and future suggestions.


3 condition* 8 dataset * 3 questions *2

    for condition in [spatial, pitch, tempo]:
      practice 10mins
      for single_dataset in [ds1, ds2, ds3, ..., ds4]:
        for question in [q1, q2, q3]:
          0.25mins
      for multiple_dataset in [ds1, ds2, ds3, ..., ds4]:
        for question in [q1]:
          0.25mins
      cognitive test 1min
    questionnaire 1min


