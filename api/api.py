from flask import Flask

app = Flask(__name__)
friends_graph={'adar':['amit', 'lia', 'daniel','yonatan', 'michal'], 'amit':['adar', 'hadar', 'ohad']}
@app.route('/')
def index():
    return {'username': 'Adar'}

@app.route('/get-all-friends/<user>')
def get_all_friends(user):
    if user in friends_graph:
        list_of_friends = friends_graph[user]
        return list_of_friends[0] #TODO : return all the list and not just the 0 place
    else: return {"{user} not in friends_graph : {friends_graph}"}
     
    

# /api/hug
# SEND NOTIFICATION FOR EVERYONE TO Hug
