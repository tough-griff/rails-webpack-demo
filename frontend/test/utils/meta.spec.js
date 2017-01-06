import meta from '../../js/utils/meta';

/*
 * JSDOM configuration.
 * <!DOCTYPE html>
 * <html>
 *   <head>
 *     <meta name="api-url" content="/api" />
 *     <meta name="csrf-token" content="FAKE_CSRF_TOKEN" />
 *   </head>
 *   <body></body>
 * </html>
 */
describe('meta()', function () {
  it('returns meta tag content', function () {
    expect(meta('csrf-token')).to.equal('FAKE_CSRF_TOKEN');
  });

  it('handles undefined tags', function () {
    expect(meta('undefined-tag')).to.be.undefined();
  });
});
