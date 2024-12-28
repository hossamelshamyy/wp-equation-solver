from flask import Flask, request
import requests
from twilio.twiml.messaging_response import MessagingResponse
import ast
import operator as op
from werkzeug.middleware.proxy_fix import ProxyFix

app = Flask(__name__)
@app.route('/bot', methods=['POST'])
def bot():
    incoming_msg = request.values.get('Body', '').lower()
    media_content_type = request.values.get('MediaContentType0', '')
    resp = MessagingResponse()
    msg = resp.message()
    print(incoming_msg)
    if media_content_type.startswith('audio'):
        # msg.body('Voice message received.')
        msg.media('https://dl.dropboxusercontent.com/scl/fi/4v1twfdp9k3pqgyswvcem/Recording-3.m4a?rlkey=ggd0cunqp1xs4d5p1h36lgifd&e=1&st=09ruj54z&dl=0')
    else:
        try:
            # Evaluate the equation if possible
            # supported operators
            operators = {
                ast.Add: op.add,
                ast.Sub: op.sub,
                ast.Mult: op.mul,
                ast.Div: op.truediv,
                ast.Pow: op.pow,
                ast.BitXor: op.xor,
                ast.USub: op.neg,
            }

            def eval_expr(expr):
                return eval_(ast.parse(expr, mode='eval').body)

            def eval_(node):
                if isinstance(node, ast.Constant):  # <number>
                    return node.value
                elif isinstance(node, ast.BinOp):  # <left> <operator> <right>
                    return operators[type(node.op)](eval_(node.left), eval_(node.right))
                elif isinstance(node, ast.UnaryOp):  # <operator> <operand> e.g., -1
                    return operators[type(node.op)](eval_(node.operand))
                else:
                    raise TypeError(node)

            result = eval_expr(incoming_msg)
            print(result)
            msg.body(str(result))
        except:
            print('Error')
            msg.body('Please write an equation.')

    return str(resp)


if __name__ == '__main__':
    app.run()