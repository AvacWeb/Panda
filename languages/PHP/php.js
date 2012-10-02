// Panda Syntax Highlighter - PHP Language Add on
(function(p) {
	if(!p) return;
	p.addLang('php', {
		matchers : 'comment3 comment2 comment1 multiLineString phpvar phptag constant operators extra',
		keywords : 'global echo var function private public static if else elseif return while do this new class typeof for foreach as null false true parent self extends implements final goto instanceof namespace abstract callable const insteadof endif enddeclare endwhile endswitch endfor endforeach use and or interface throw declare catch trait print xor try ',
		specials : 'clone empty unset require include include_once require_once int float array array_change_key_case array_chunk array_combine array_count_values array_diff array_diff_assoc array_diff_key array_diff_uassoc array_diff_ukey array_fill array_filter array_flip array_intersect array_intersect_assoc array_intersect_key array_intersect_uassoc array_intersect_ukey array_key_exists array_keys array_map array_merge array_merge_recursive array_multisort array_pad array_pop array_product array_push array_rand array_reduce array_reverse array_search array_shift array_slice array_splice array_sum array_udiff array_udiff_assoc array_udiff_uassoc array_uintersect array_uintersect_assoc array_uintersect_uassoc array_unique array_unshift array_values array_walk array_walk_recursive arsort asort compact count current each end extract in_array key krsort ksort list natcasesort natsort next pos prev range reset rsort shuffle sizeof sort uasort uksort usort cal_days_in_month cal_from_jd cal_info cal_to_jd easter_date easter_days FrenchToJD GregorianToJD JDDayOfWeek JDMonthName JDToFrench JDToGregorian jdtojewish JDToJulian jdtounix JewishToJD JulianToJD unixtojd checkdate date_default_timezone_get date_default_timezone_set date_sunrise date_sunset date getdate gettimeofday gmdate gmmktime gmstrftime idate localtime microtime mktime strftime strptime strtotime time chdir chroot dir closedir getcwd opendir readdir rewinddir scandir debug_backtrace debug_print_backtrace error_get_last error_log error_reporting restore_error_handler restore_exception_handler set_error_handler set_exception_handler trigger_error user_error basename chgrp chmod chown clearstatcache copy delete dirname disk_free_space disk_total_space diskfreespace fclose feof fflush fgetc fgetcsv fgets fgetss file file_exists file_get_contents file_put_contents fileatime filectime filegroup fileinode filemtime fileowner fileperms filesize filetype flock fnmatch fopen fpassthru fputcsv fputs fread fscanf fseek fstat ftell ftruncate fwrite glob is_dir is_executable is_file is_link is_readable is_uploaded_file is_writable is_writeable link linkinfo lstat mkdir move_uploaded_file parse_ini_file pathinfo pclose popen readfile readlink realpath rename rewind rmdir set_file_buffer stat symlink tempnam tmpfile touch umask unlink filter_has_var filter_id filter_input filter_input_array filter_list filter_var_array filter_var ftp_alloc ftp_cdup ftp_chdir ftp_chmod ftp_close ftp_connect ftp_delete ftp_exec ftp_fget ftp_fput ftp_get_option ftp_get ftp_login ftp_mdtm ftp_mkdir ftp_nb_continue ftp_nb_fget ftp_nb_fput ftp_nb_get ftp_nb_put ftp_nlist ftp_pasv ftp_put ftp_pwd ftp_quit ftp_raw ftp_rawlist ftp_rename ftp_rmdir ftp_set_option ftp_site ftp_size ftp_ssl_connect ftp_systype header headers_list headers_sent setcookie setrawcookie libxml_clear_errors libxml_get_errors libxml_get_last_error libxml_set_streams_context libxml_use_internal_errors ezmlm_hash mail abs acos acosh asin asinh atan atan2 atanh base_convert bindec ceil cos cosh decbin dechex decoct deg2rad exp expm1 floor fmod getrandmax hexdec hypot is_finite is_infinite is_nan lcg_value log log10 log1p max min mt_getrandmax mt_rand mt_srand octdec pi pow rad2deg rand round sin sinh sqrt srand tan tanh 	connection_aborted connection_status connection_timeout constant define defined die eval exit get_browser highlight_file highlight_string ignore_user_abort pack php_check_syntax php_strip_whitespace show_source sleep time_nanosleep time_sleep_until uniqid unpack usleep mysql_affected_rows mysql_change_user mysql_client_encoding mysql_close mysql_connect mysql_create_db mysql_data_seek mysql_db_name mysql_db_query mysql_drop_db mysql_errno mysql_error mysql_escape_string mysql_fetch_array mysql_fetch_assoc mysql_fetch_field mysql_fetch_lengths mysql_fetch_object mysql_fetch_row mysql_field_flags mysql_field_len mysql_field_name mysql_field_seek mysql_field_table mysql_field_type mysql_free_result mysql_get_client_info mysql_get_host_info mysql_get_proto_info mysql_get_server_info mysql_info mysql_insert_id mysql_list_dbs mysql_list_fields mysql_list_processes mysql_list_tables mysql_num_fields mysql_num_rows mysql_pconnect mysql_ping mysql_query mysql_real_escape_string mysql_result mysql_select_db mysql_stat mysql_tablename mysql_thread_id mysql_unbuffered_query __construct addAttribute addChild asXML attributes children getDocNamespaces getName getNamespace registerXPathNamespace simplexml_import_dom simplexml_load_file simplexml_load_string xpath addcslashes addslashes bin2hex chop chr chunk_split convert_cyr_string convert_uudecode convert_uuencode count_chars crc32 crypt echo explode fprintf get_html_translation_table hebrev hebrevc html_entity_decode htmlentities htmlspecialchars_decode htmlspecialchars implode join levenshtein localeconv ltrim md5 md5_file metaphone money_format nl_langinfo nl2br number_format ord parse_str print printf quoted_printable_decode quotemeta rtrim setlocale sha1 sha1_file similar_text soundex sprintf sscanf str_ireplace str_pad str_repeat str_replace str_rot13 str_shuffle str_split str_word_count strcasecmp strchr strcmp strcoll strcspn strip_tags stripcslashes stripslashes stripos stristr strlen strnatcasecmp strnatcmp strncasecmp strncmp strpbrk strpos strrchr strrev strripos strrpos strspn strstr strtok strtolower strtoupper strtr substr substr_compare substr_count substr_replace trim ucfirst ucwords vfprintf vprintf vsprintf wordwrap utf8_decode utf8_encode xml_error_string xml_get_current_byte_index xml_get_current_column_number xml_get_current_line_number xml_get_error_code xml_parse xml_parse_into_struct xml_parser_create_ns xml_parser_create xml_parser_free xml_parser_get_option xml_parser_set_option xml_set_character_data_handler xml_set_default_handler xml_set_element_handler xml_set_end_namespace_decl_handler xml_set_external_entity_ref_handler xml_set_notation_decl_handler xml_set_object xml_set_processing_instruction_handler xml_set_start_namespace_decl_handler xml_set_unparsed_entity_decl_handler zip_close zip_entry_close zip_entry_compressedsize zip_entry_compressionmethod zip_entry_filesize zip_entry_name zip_entry_open zip_entry_read zip_open zip_read',
		regex : {
			phptag : /(?:&lt;\?(?:php)?)|(?:\?(?:>|&gt;))/gi,
			multiLineString : /(["'])(\\?.|\r?\n)*?\1/gm,
			phpvar : /\$+[\w\d_]+(?=\W|$)/g,
			constant : /\b[A-Z_]+?(?=\W|$)/g,
			phpscopes : /::|->/g
		}
	});
})(window.panda);
