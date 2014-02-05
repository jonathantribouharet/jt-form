# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140130203528) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "form_extras", force: true do |t|
    t.integer  "section_id",                      null: false
    t.string   "input",                           null: false
    t.text     "options",    default: "--- {}\n", null: false
    t.boolean  "is_premium", default: false,      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "form_extras", ["section_id"], name: "index_form_extras_on_section_id", using: :btree

  create_table "form_forms", force: true do |t|
    t.string   "name",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "form_questions", force: true do |t|
    t.integer  "subsection_id",                      null: false
    t.integer  "position",                           null: false
    t.text     "content"
    t.string   "key",                                null: false
    t.string   "input",                              null: false
    t.text     "options",       default: "--- {}\n", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "hint"
  end

  add_index "form_questions", ["subsection_id"], name: "index_form_questions_on_subsection_id", using: :btree

  create_table "form_sections", force: true do |t|
    t.integer  "form_id",                      null: false
    t.integer  "position",                     null: false
    t.string   "name",                         null: false
    t.boolean  "is_removable", default: false, null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "icon"
  end

  add_index "form_sections", ["form_id"], name: "index_form_sections_on_form_id", using: :btree

  create_table "form_subsections", force: true do |t|
    t.integer  "section_id", null: false
    t.integer  "position",   null: false
    t.string   "name",       null: false
    t.text     "help"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "form_subsections", ["section_id"], name: "index_form_subsections_on_section_id", using: :btree

  create_table "proposal_access_stats", force: true do |t|
    t.integer  "proposal_id",   null: false
    t.integer  "access_url_id", null: false
    t.string   "remote_ip",     null: false
    t.string   "referer"
    t.datetime "session_end",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "proposal_access_stats", ["access_url_id"], name: "index_proposal_access_stats_on_access_url_id", using: :btree
  add_index "proposal_access_stats", ["proposal_id"], name: "index_proposal_access_stats_on_proposal_id", using: :btree

  create_table "proposal_access_urls", force: true do |t|
    t.integer  "proposal_id", null: false
    t.string   "name",        null: false
    t.string   "token",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "proposal_access_urls", ["proposal_id"], name: "index_proposal_access_urls_on_proposal_id", using: :btree
  add_index "proposal_access_urls", ["token"], name: "index_proposal_access_urls_on_token", using: :btree

  create_table "proposal_answers", force: true do |t|
    t.integer  "proposal_id", null: false
    t.integer  "question_id", null: false
    t.string   "key",         null: false
    t.text     "data",        null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "proposal_answers", ["proposal_id"], name: "index_proposal_answers_on_proposal_id", using: :btree

  create_table "proposal_contacts", force: true do |t|
    t.integer  "proposal_id",                         null: false
    t.integer  "access_url_id"
    t.integer  "access_stat_id"
    t.string   "name"
    t.string   "email"
    t.string   "phone"
    t.string   "company"
    t.string   "job"
    t.string   "website"
    t.text     "content"
    t.text     "packages",       default: "--- {}\n", null: false
    t.text     "non_packages",   default: "--- {}\n", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "proposal_extras", force: true do |t|
    t.integer  "proposal_id", null: false
    t.integer  "section_id",  null: false
    t.text     "data",        null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "proposal_extras", ["proposal_id"], name: "index_proposal_extras_on_proposal_id", using: :btree

  create_table "proposal_media", force: true do |t|
    t.integer  "proposal_id",        null: false
    t.string   "media_file_name"
    t.string   "media_content_type"
    t.integer  "media_file_size"
    t.datetime "media_updated_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "media_image_size"
  end

  add_index "proposal_media", ["proposal_id"], name: "index_proposal_media_on_proposal_id", using: :btree

  create_table "proposal_proposals", force: true do |t|
    t.integer  "form_id",                                  null: false
    t.integer  "user_id",                                  null: false
    t.integer  "template_id",                              null: false
    t.string   "name",                                     null: false
    t.integer  "percent",             default: 0,          null: false
    t.text     "data",                default: "--- {}\n", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "eventbrite_event_id"
    t.string   "meetup_event_id"
  end

  add_index "proposal_proposals", ["user_id"], name: "index_proposal_proposals_on_user_id", using: :btree

  create_table "social_accounts", force: true do |t|
    t.integer  "user_id",       null: false
    t.string   "provider_name", null: false
    t.string   "provider_uid",  null: false
    t.string   "token"
    t.datetime "expires_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "refresh_token"
  end

  create_table "template_answers", force: true do |t|
    t.integer  "proposal_id", null: false
    t.integer  "question_id", null: false
    t.string   "key",         null: false
    t.text     "data",        null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "template_answers", ["proposal_id"], name: "index_template_answers_on_proposal_id", using: :btree

  create_table "template_questions", force: true do |t|
    t.integer  "section_id",                      null: false
    t.integer  "position",                        null: false
    t.text     "content"
    t.string   "key",                             null: false
    t.string   "input",                           null: false
    t.text     "options",    default: "--- {}\n", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "template_questions", ["section_id"], name: "index_template_questions_on_section_id", using: :btree

  create_table "template_sections", force: true do |t|
    t.integer  "template_id", null: false
    t.integer  "position",    null: false
    t.string   "name",        null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "template_sections", ["template_id"], name: "index_template_sections_on_template_id", using: :btree

  create_table "template_templates", force: true do |t|
    t.string   "name",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "email"
    t.string   "password_digest"
    t.string   "name"
    t.string   "job"
    t.string   "twitter"
    t.string   "linkedin"
    t.string   "phone"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.datetime "last_login_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "firsttime_dashboard",    default: true,  null: false
    t.boolean  "firsttime_new_proposal", default: true,  null: false
    t.boolean  "have_social",            default: false, null: false
  end

end
