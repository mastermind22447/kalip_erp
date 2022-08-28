from neomodel import db
from neomodel import Traversal, Q


def get_by_id(class_, node_id):
    """
    Get node by neo4j generated id
    """
    Model = getattr(class_, '__label__')
    query = "MATCH (n:%s) WHERE id(n) = %s return n" % (Model, node_id)
    results, meta = db.cypher_query(query, {})
    model_instance = [class_.inflate(row[0]) for row in results][0]
    return model_instance


def get_relations_by_prop(source_label, rel_node, direction, prop, value):
    # query = f"MATCH (a:{source_label})<-[:`{direction}`]-(node) WHERE id(a) = 24 return node"
    query = f"MATCH (n:{source_label} {{{prop}: '{value}'}})-[:`{direction}`]-(book:Book) RETURN book "
    results, meta = db.cypher_query(query, {})
    relations = [rel_node.inflate(row[0]) for row in results]
    return relations

def get_uid_relations(source_label, rel_node, direction, uid):
    # query = f"MATCH (a:{source_label})<-[:`{direction}`]-(node) WHERE id(a) = 24 return node"
    query = f"MATCH (n:{source_label} {{uid: '{uid}'}})-[:`{direction}`]-(book:Book) RETURN book "
    results, meta = db.cypher_query(query, {})
    relations = [rel_node.inflate(row[0]) for row in results]
    return relations


def get_relations(source_label, rel_node, direction):
    query = f"MATCH (a:{source_label})<-[:`{direction}`]-(node) WHERE id(a) = 24 return node"
    results, meta = db.cypher_query(query, {})
    relations = [rel_node.inflate(row[0]) for row in results]
    return relations


def ex_query(node, query):
    results, meta = db.cypher_query(query, {})
    relations = [node.inflate(row[0]) for row in results]
    return relations
