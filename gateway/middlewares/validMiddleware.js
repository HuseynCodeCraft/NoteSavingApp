const validationRules = [
  // SQL injection prevention
  { pattern: /(UNION[\s\S]*SELECT|SELECT[\s\S]*FROM)/i, action: 'block' },
  { pattern: /[\(\);]/, action: 'block' }, // Block common SQL injection characters

  // Path traversal prevention
  { pattern: /\.\.\//, action: 'block' }, // Block '../' sequences
  { pattern: /\/etc\/passwd|\/etc\/shadow/, action: 'block' }, // Block specific sensitive paths
  { pattern: /\.\.%2f/i, action: 'block' },
  { pattern: /\.\.%252f/i, action: 'block' },

  // XSS prevention
  { pattern: /<\s*script\s*>/i, action: 'block' }, // Block <script> tags
  { pattern: /<\s*script\s*>.*<\/\s*script\s*>/i, action: 'block' }, // Block script content
  { pattern: /<\s*iframe\s*>/i, action: 'block' }, // Block <iframe> tags

];

function validationMiddleware(req, res, next) {
  for (const rule of validationRules) {
    if (rule.pattern.test(req.url)) {
      if (rule.action === 'block') {
         return res.status(403).send('Forbidden');
      }
    }
  }
  next();
}

module.exports = validationMiddleware;

