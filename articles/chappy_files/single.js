require([
	'site_script',
	'vmp_article',
	'sharing_widget',
	'todays_stories_pager',
	'hammer'
], function(Site_Script, Vmp_Article, Sharing_Widget, Todays_Stories_Pager, Hammer){
	var App = Backbone.View.extend({
		el : $('.article-single-page-container'),

		initialize : function(){
			this.setVariables();

			this.renderBodyImageShareWidgets();
		},

		setVariables : function(){
			this.site_script = new Site_Script();

			this.vmp_article = new Vmp_Article();

			this.has_images = $(this.el).find('.has-image').length ? true : false;
			this.body_image_share_widget_template = _.template($('#article-photos-share-widget-template').length ?
				$('#article-photos-share-widget-template').html() : '');

			// article nav socials
			this.article_share_widget_el = this.$('.article-header-share-widget');

			//article bottom nav socials
			this.article_share_bottom_widget_el = this.$('.article-bottom-share-widget');

			if(this.article_share_widget_el.length !== 0){
				this.article_share_widget = new Sharing_Widget({
					el : this.article_share_widget_el
				});
			}

			if(this.article_share_bottom_widget_el.length !== 0){
				this.article_share_widget = new Sharing_Widget({
					el : this.article_share_bottom_widget_el
				});
			}

			this.site_script.loadSocials();
		},

		renderBodyImageShareWidgets : function(){
			if(this.has_images){
				this.body_share_widgets = [];
				this.$('.has-image img, .gallery-image img').wrap('<span class="body-image-wrapper"></div>').each(function(i, el){
					var $image_el = this.$(el),
						widget_html = this.body_image_share_widget_template({
							media : $image_el.attr('src')
						}),
						$widget_el,
						h;

					$widget_el = $image_el.before(widget_html).siblings('.body-image-share-widget');

					this.body_share_widgets.push(new Sharing_Widget({
						el : $widget_el
					}));

					// have to give hammer a target as we 
					// reposition the image tag
					h = new Hammer($image_el.get(0));
					h.on('tap', this.onBodyImageTapEvent);

				}.bind(this));
			}
		},

		onBodyImageTapEvent : function(e){
			$(e.target).siblings('.body-image-share-widget').toggleClass('tapped');
		}
	});

	var Article_Todays_Stories_Pager = Todays_Stories_Pager.extend({
		el : $('.article-todays-stories')
	});

	$(function(){
		var app = new App(),
		article_todays_story_pager = new Article_Todays_Stories_Pager();
	});
});
