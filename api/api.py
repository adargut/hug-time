from flask import Flask
from flask_cors import CORS
from random import randint, choice

app = Flask(__name__)
CORS(app)
friends_graph={'adar':['amit', 'lia', 'daniel','yonatan', 'michal'], 'amit':['adar', 'hadar', 'ohad']}
current_user = None

@app.route('/api/is-hug-time/<user>')
def is_hug_time(user):    
    if randint(0, 1) == 1:
        res = {
            'is_hug_time': 'YES',
            'friend_to_hug': choice(friends_graph[user])
        }
        
    else:
        res = {'is_hug_time': 'NO'}
        
    app.logger.info('is-hug-time returning response=' + str(res))
    return res
    
@app.route('/api/authenticate/new-user/<user>') 
def register_user(user):
    if user in friends_graph: # TODO connect with mongoDB
        res = {'success': False}
    else:
        friends_graph[user] = []
        res = {'success': True}
        
@app.route('/api/add-friend-to-user/<user>/<friend>')
def add_friend_to_user(user, friend):
    if user not in friends_graph: # TODO connect with mongoDB
        res = {'success': False}
    else:
        friends_graph[user].append(friend)
        res = {'success': True}

@app.route('/api/get-all-friends/<user>')
def get_all_friends(user):
    
    if user not in friends_graph:
        res = {'friends': []}
    else:
        res = {'friends': ','.join(friends_graph[user])}
        
    app.logger.info('get-all-friends returning response=' + str(res))
    
    return res
     
    

# /api/hug
# SEND NOTIFICATION FOR EVERYONE TO Hug
